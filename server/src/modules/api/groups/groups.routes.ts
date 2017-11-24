import * as express from 'express';
import { UsersRoutes} from '../users/users.routes';
import { CONFIG } from "../../../config";

const Datastore = require('nedb-promises');
const groupDB = new Datastore(CONFIG.GROUPS_FILE);
const router = express.Router();

export class GroupsRoutes {

  // Get group by ID route
  public static getGroupByIDRoute(req, res) {
    if (!req.params.id) {
      return res.status(400).json({message: "Aucun ID n'a été trouvé dans la requête.", success: false});
    }
    // Find a group by it's ID
    groupDB.findOne({ _id: req.params.id })
      .then((group) => {
        if (group) {
          // Add owner and members user objects
          return GroupsRoutes.populateGroup(group);
        } else {
          return res.status(404).json({message: "Aucun groupe n'a été trouvé.", success: false});
        }
      })
      .then((group) => {
        return res.json({group: group, success: true});
      })
      .catch((error) => res.status(500).json({message: "Une erreur s'est produite lors de la récupération des groupes.", success: false}));
  }

  // Get all groups route
  public static getAllGroupsRoute(req, res): void {
    // Find all groups
    groupDB.find({})
    .then((groups) => {
      if (groups) {
        let results = [];
        // Loop on each groups and limit of "from" and "to" parameters have been set
        groups.map((group, index) => {
          if (req.params.from && req.params.to) {
            if (index >= parseInt(req.params.from) && index <= parseInt(req.params.to)) {
              results.push(group);
            }
          }
          else {
            results.push(group);
          }
        });
        return res.json({groups: results, total: groups.length, success: true});
      } else {
        return res.status(404).json({message: "Aucun groupe n'a été trouvé.", success: false});
      }
    })
    .catch((error) => res.status(500).json({message: "Une erreur s'est produite lors de la récupération des groupes.", success: false}));
  }

  // Save group route
  public static saveGroupRoute(req, res): void {
    if (!req.body.name) {
      return res.status(400).json({message: "Un groupe doit avoir au moins un nom.", success: false});
    }
    let group = Object.assign({}, req.body);

    // Check if group's owner and members are valid
    GroupsRoutes.populateGroup(req.body).then((groupOk) => {

      // Manage the update
      if (group._id) {
        groupDB.findOne({ _id: group._id })
        .then((checkGroup) => {
          if (checkGroup) {
            return groupDB.update({ _id: group._id }, group)
              .then((updated) => {
                return res.json({group: group, success: true});
              })
              .catch((error) => res.status(500).json({message: "Une erreur s'est produite lors de la mise à jour du groupe", success: false}));
          } else {
            return res.status(404).json({message: "Impossible de modifier ce groupe, aucun groupe n'a été trouvé.", success: false});
          }
        });
      }

      // Manage the insert
      else {
        groupDB.findOne({ name: group.name })
        .then((checkGroup) => {
          if (!checkGroup) {
            return groupDB.insert(group)
              .then((inserted) => {
                return res.json({group: group, success: true});
              })
              .catch((error) => res.status(500).json({message: "Une erreur s'est produit lors de l'insertion du groupe", success: false}));
          } else {
            return res.status(401).json({message: "Impossible d'insérer ce groupe, car un groupe du même nom existe déjà.", success: false});
          }
        })
        .catch((error) => res.status(500).json({message: "Une erreur s'est produite lors de la vérification de l'existance des groupes.", success: false}));
      }
    }).catch((error) => res.status(500).json({message: error, success: false}));

  }

  // Delete group route
  public static deleteGroupRoute(req, res): void {
    if (!req.params.id) {
      return res.status(400).json({message: "Aucun ID n'a été trouvé dans la requête.", success: false});
    }
    groupDB.remove({ _id: req.params.id })
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({message: "Aucun groupe n'a été trouvé.", success: false});
        } else {
          return res.json(deleted);
        }
      })
      .catch((error) => res.status(500).json({message: "Une erreur s'est produite lors de la suppression du groupe.", success: false}));
  }

  // Populate group with it's owner and members
  public static async populateGroup(group) {
    let result = await UsersRoutes.getUsersByID([group.owner])
      .then((owner) => {
        if (owner.length == 0) {
          return Promise.reject("Une erreur s'est produite au rattachement de l'auteur");
        }
        group.owner = owner[0];
        if (!group.hasOwnProperty('group.members')) group.members = [];
        return UsersRoutes.getUsersByID(group.members);
      })
      .then((members) => {
        if (members.length != group.members) {
          return Promise.reject("Une erreur s'est produite au rattachement des membres");
        }
        group.members = members;
        return group;
      });
    return result;
  }
  
}
