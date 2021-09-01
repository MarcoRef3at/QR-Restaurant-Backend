const sequelize = require("../../sequelize");
const { Devices, Features } = sequelize.models;
const execludeAttribute = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};
const includeDevices = {
  include: [
    {
      model: Devices,
      attributes: ["name"],
    },
  ],
};

// Filter Table Records by Ids
const getIds = async (TableName, names) => {
  let Ids = [];
  await Promise.all(
    names.map(async (name) => {
      // Get Permissions of target user role and all children roles
      let record = await sequelize.models[TableName].findOne({
        where: {
          name,
        },
      });
      //To Handle misspelled permission names
      //And Repeated Permissions
      if (record && !Ids.includes(record.dataValues.id)) {
        return Ids.push(record.dataValues.id);
      }
    })
  );
  return Ids;
};

// Filter Table Records by names
const getNames = async (TableName, Ids) => {
  let names = [];
  await Promise.all(
    Ids.map(async (id) => {
      let record = await sequelize.models[TableName].findOne({
        where: { id },
      });
      //To Handle misspelled record names
      //And Repeated Names
      if (record && !names.includes(record.dataValues.name)) {
        return names.push(record.dataValues.name);
      }
    })
  );
  return names;
};

// 1- Get Features Ids
// 2-Get Features Names
// 3-Associate features ids to the target device
// 4-Return Back the new device data
const setDevices = async (devicesUnfilteredNames, device) => {
  console.log("devicesUnfilteredNames:", devicesUnfilteredNames);
  // Filter Features by name and Ids
  //1- Get Features IDs by filtering them
  let devicesIds = await getIds("Devices", devicesUnfilteredNames);

  // 2-Get Names of the previous filtered features
  let devicesNames = await getNames("Devices", devicesIds);

  return new Promise(async (resolve, reject) => {
    await device.setDevices([...devicesIds]);
    // Add Filtered Features to response
    device.dataValues.zone = devicesNames;
    resolve(device); //returns x in .then
  });
};

module.exports = {
  execludeAttribute,
  includeDevices,
  getIds,
  getNames,
  setDevices,
};
