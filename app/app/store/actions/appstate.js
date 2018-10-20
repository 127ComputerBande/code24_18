export const AppStateTypes = {
    BECAME_ACTIVE: 'AppState/BECAME_ACTIVE',
    BECAME_INACTIVE: 'AppState/BECAME_INACTIVE'
};

const becameActive = () => (
    {
        type: AppStateTypes.BECAME_ACTIVE
    }
);

const becameInactive = () => (
    {
        type: AppStateTypes.BECAME_INACTIVE
    }
);

export const AppStateActions = {
    becameActive,
    becameInactive
};

