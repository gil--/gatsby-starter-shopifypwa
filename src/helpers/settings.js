export function getSetting(data, settingName) {
    // possibly replace with lodash lol...
    return data && data.allFile && data.allFile.edges && data.allFile.edges[0].node.childJson[settingName];
}