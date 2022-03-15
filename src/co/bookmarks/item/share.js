export default async function send({ title, fileType, link, cover }) {
    await require('react-native-share').default.open({
        title,
        url: link,
        type: fileType,
        failOnCancel: false,
        showAppsToView: true
    })
}