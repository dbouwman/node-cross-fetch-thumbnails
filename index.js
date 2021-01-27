require('dotenv').config()
require('cross-fetch/polyfill');
require('isomorphic-form-data');
const { updateItem } = require('@esri/arcgis-rest-portal');
const { UserSession } = require('@esri/arcgis-rest-auth');
const fs = require('fs');


const username = 'qa_bas_sol_admin';
const password = process.env.PASSWORD;
const portal = 'https://qa-bas-hub.mapsqa.arcgis.com/sharing/rest';

const session = new UserSession({
  username,
  password,
  portal
});

// fetch a thumbnail from one item, and upload it to another
const sourceItemId = 'af8446ef3d3a4c49952dc178c6265110';
const targetItemId = 'f63d6a9035f6465eb15794d43d9bd490';

const tnUrl = 'https://qa-bas-hub.mapsqa.arcgis.com/sharing/rest/content/items/af8446ef3d3a4c49952dc178c6265110/info/thumbnail/thumbnail1611702961383.png';

return fetch(tnUrl)
.then((response) => {
  return response.arrayBuffer()
})
.then((buffer) => {

  return updateItem({
    item: {
      id: targetItemId
    },
    authentication: session,
    params: {
      thumbnail: fs.createReadStream(buffer)
    }
  })
  .then((resp) => {
    console.log(`Updated Thumbnail: `, resp);
  })
  .catch((ex) => {
    console.log(`Error updating thumbnail: `, ex);
  })
})