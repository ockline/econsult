let initialState = {
        lang: "en",
        dir: "ltr",
        class: "light",
        dataMenuStyles: "dark",
        dataNavLayout: "vertical",
        dataHeaderStyles: "light",
        dataVerticalStyle: "overlay",
        StylebodyBg:"107 64 64",
        StyleDarkBg:"93 50 50",
        toggled:"closed",
        dataNavStyle:"",
        horStyle:"",
        dataPageStyle:"regular",
        dataWidth:"fullwidth",
        dataMenuPosition:"fixed",
        dataHeaderPosition:"fixed",
        iconOverlay:"",
        colorPrimaryRgb:"",
        colorPrimary:"",
        bodyBg:"",
        darkBg:"",
        bgImg:"",
        iconText:"",
        body:{
            class:""
        },
        roles: ['ALL'],
        user: {}
};

export default function reducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {

    case "ThemeChanger":
      state = payload
      return state

    case "UserChanger":
      return {...state, user: payload}

    case "RolesChanger":
      // payload will be an array of roles, of which in every case 'ALL' alias will be available
      // data = [1, 2, 3, 4]
      // console.log('Setting roles:', payload);
      return {...state, roles: ['ALL', ...payload]}

    default:
      return state;
  }
}