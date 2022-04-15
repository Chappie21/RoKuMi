export const constants = {
    baseUrl: 'https://rokumi.herokuapp.com/',
    postLogin: 'user/signIn',
    postRegister: 'user/signUp',
    seriesEP: 'serie',
    getUserSeries: 'serie/mySeries',
    getUserSeriesFollowed: 'user/trackinglist',
    getChapterstBySerie: (serie) => `serie/${serie}`,
    postChapter: (serie) => `chapter/${serie}`,
    getChapter: (chapter) => `chapter/${chapter}`,
    logOut: 'user/logOut'
}