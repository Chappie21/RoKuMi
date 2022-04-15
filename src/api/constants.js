export const constants = {
    baseUrl: 'https://rokumi.herokuapp.com/',
    postLogin: 'user/signIn',
    postRegister: 'user/signUp',
    seriesEP: 'serie',
    getUserSeries: 'serie/mySeries',
    getUserSeriesFollowed: 'user/trackingList',
    getChapterstBySerie: (serie) => `serie/${serie}`,
    postChapter: (serie) => `chapter/${serie}`,
    getChapter: (chapter) => `chapter/${chapter}`,
    logOut: 'user/logOut',
    getFollowSerie: (serie) => `serie/track/${serie}`,
    deleteStopFollowSerie: (serie) => `serie/untrack/${serie}`
}