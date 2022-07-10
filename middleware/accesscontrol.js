const { AccessControl } = require("accesscontrol");

const ac = new AccessControl();

// ac.grant('user').readAny('post').grant('admin').extend('user').updateAny('post').deleteAny('post')
