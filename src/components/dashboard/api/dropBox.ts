import axios from "axios";

const UPLOAD_DOC_URL = 'https://content.dropboxapi.com/2/files/upload';
const DELETE_DOC_URL = 'https://api.dropboxapi.com/2/files/delete_v2';
const DOWNLOAD_DOC_URL = 'https://content.dropboxapi.com/2/files/download';
const BEARER_TOKEN = 'sl.ByXeMbFtpsdIaqXsSMSyDPDztUvLLdgPNW7ri4RvLAeiSn1tdFWW7FG1bUwTrgYGxWG9CNVyHu5oDnPnOzNVrwqdTqc69AYEbcfEFbCoLQvjJ8eLm5Ic0ncR52AOgSgV-P6OmHE69gB46c8qLmU-Ayw'

export const saveClientFiles = async ({ selectedFile, fileData }) => {
  const headers = {
    'Content-Type': 'application/octet-stream',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Dropbox-API-Arg': JSON.stringify({
      path: `/agency-clients/${selectedFile.name}`,
      mode: 'add',
      autorename: true,
      mute: false,
    }),
  };

  return await axios.post(UPLOAD_DOC_URL, fileData, {
    headers
  });
}

export const deleteClientFiles = async (name:string) => {
  const payload = {
    path: `/agency-clients/${name}`
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
  };

  return await axios.post(DELETE_DOC_URL, payload, {
    headers
  });
}

export const downloadClientFiles = async (id:string) => {
  const headers = {
    'Content-Type': 'application/octet-stream',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Dropbox-API-Arg': JSON.stringify({
      "path": id
    }),
  };

  return await axios.post(DOWNLOAD_DOC_URL, null, {
    headers
  });
}

// export const getTemporaryFileLink = async (id:string) => {
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${BEARER_TOKEN}`,
  //   // 'Dropbox-API-Arg': JSON.stringify({
  //   //   "path": `/Homework/math/${id}`,
  //   // }),
  // };
  //
  // const data = {
  //   "commit_info": {
  //     "autorename": true,
  //     "mode": "add",
  //     "mute": false,
  //     "path": `/Homework/math/${id}`,
  //     "strict_conflict": false
  //   },
  //   "duration": 3600
  // }
  //
  // const res = await axios.post('https://api.dropboxapi.com/2/files/get_temporary_upload_link', data, {
  //   headers
  // });

  // console.log(res.data.link)

//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${BEARER_TOKEN}`,
//     'Dropbox-API-Arg': JSON.stringify({
//       "path": `/Homework/math/${id}`,
//       "url": "https://content.dropboxapi.com/apitul/1/MWsf1ei9ckbpcw"
//     }),
//   };
//
//   const res2 = await axios.post('https://content.dropboxapi.com/2/sharing/get_shared_link_file', undefined, {
//     headers
//   });
//
//   console.log(res2)
//
//   return res2
// }