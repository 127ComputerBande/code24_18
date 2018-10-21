export default class Navigation {
    static getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }

        const route = navigationState.routes[navigationState.index];

        if (route.routes) {
            return this.getCurrentRouteName(route);
        }

        return route.routeName;
    }
}