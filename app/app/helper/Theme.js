import _ from 'lodash';

/**
 * Use this helper to generate the final style objects. It supports dynamic theme mapping by different property values
 * or by just checking for the existence of a single value.
 *
 * 1) Multiple values (e.g. "themes")
 * Allows to auto-apply themes related to the value of the "theme" property. "selectedValue" references the actual
 * value, "values" contains an object with matching values as keys:
 *
 * styles = {
 *     button: Theme.getTheme(
 *         styles.button,
 *         [
 *             {
 *                 selectedValue: this.props.theme,
 *                 values:        {
 *                     orange: styles.buttonOrange,
 *                     yellow: styles.buttonYellow
 *                 }
 *             },
 *         ]
 *     ),
 *     [...]
 * };
 *
 * If "this.props.theme" is "orange", "styles.button" and "styles.buttonOrange" will be applied.
 * If "this.props.theme" is "yellow", "styles.button" and "styles.buttonYellow" will be applied.
 * If "this.props.theme" is "red", only "styles.button" will be applied.
 *
 * 2) Multiple styles
 * Its also possible to mix styles when a property matches
 *
 * styles = {
 *     button: Theme.getTheme(
 *         styles.button,
 *         [
 *             {
 *                 selectedValue: this.props.theme,
 *                 values:        {
 *                     yellowUnderscored:  [
 *                         styles.buttonYellow,
 *                         styles.buttonUnderscored
 *                     ],
 *                 }
 *             },
 *         ]
 *     ),
 *     [...]
 * };
 *
 * If "this.props.theme" is "yellowUnderscored", "styles.button", "styles.buttonYellow" and "styles.buttonUnderscored"
 * will be applied.
 * If "this.props.theme" is "red", only "styles.button" will be applied.
 *
 * 3) Single value existance
 * Applies the theme if a given property is "true".
 *
 * styles = {
 *     image: Theme.getTheme(
 *         styles.image,
 *         [
 *             {
 *                 selectedValue: this.props.alignRight,
 *                 value:         styles.imageRight
 *             },
 *         ]
 *     ),
 *     [...]
 * };
 *
 * If "this.props.alignRight" is "true", "styles.image" and "styles.imageRight" will be applied.
 * If "this.props.alignRight" is "false", only "styles.image" will be applied.
 */
export default class ThemeHelper {
    static getTheme (defaultTheme, mappingList) {
        const themes = [];

        if (defaultTheme) {
            if (_.isArray(defaultTheme)) {
                for (let i in defaultTheme) {
                    let currentDefaultTheme = defaultTheme[i];
                    themes.push(currentDefaultTheme);
                }
            } else {
                themes.push(defaultTheme);
            }
        }

        if (mappingList) {
            for (const mappingKey in mappingList) {
                const mapping = mappingList[mappingKey];

                if (mapping.values) {
                    for (const possibleValue in mapping.values) {
                        if (mapping.selectedValue === possibleValue) {
                            if (_.isArray(mapping.values[possibleValue])) {
                                for (let i in mapping.values[possibleValue]) {
                                    let currentTheme = mapping.values[possibleValue][i];
                                    themes.push(currentTheme);
                                }
                            } else {
                                themes.push(mapping.values[possibleValue]);
                            }
                        }
                    }
                } else if (mapping.value && mapping.selectedValue) {
                    themes.push(mapping.value);
                }

                if (mapping.height) {
                    themes.push({ height: mapping.height })
                }
            }
        }

        return themes;
    }
}