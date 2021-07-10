module.exports = async () => {
  // Check if the plugin users-permissions is installed because the navigation needs it
  if (Object.keys(strapi.plugins).indexOf("users-permissions") === -1) {
    throw new Error(
      "In order to make the menu plugin work the users-permissions plugin is required",
    );
  }

  // Add permissions
  const actions = [
    {
      section: "plugins",
      displayName: "Access the Menu",
      uid: "read",
      pluginName: "menu",
    },
  ];

  const { actionProvider } = strapi.admin.services.permission;
  await actionProvider.registerMany(actions);
};
