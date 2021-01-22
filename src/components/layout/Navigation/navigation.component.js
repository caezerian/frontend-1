import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* import components */
import NavigationButton from './NavigationButton/navigation-button.component';
/* import contexts */
import { UIContext } from '../../../contexts';
/* import styles */
import { StyledNavigation } from './navigation.styles';

const Navigation = props => {

    const { data } = props;
    const { ui, uiMethods } = useContext(UIContext);
    const routePath = useLocation().pathname;

    const renderNavigationButtons = () => {
        if (!data) {return null}
        return data.map(button => {
            const { id, label, icon, link } = button;
            return (
                <Link 
                    data-db-el="navigation-router-link"
                    key={id} 
                    to={link}
                    style={{ textDecoration: 'none' }}
                >
                    <NavigationButton 
                        data-db-el="navigation-button"
                        label={label}
                        icon={icon}
                        active={ui.activeRoute.link === link}
                    />
                </Link>
            );
        });
    };

    useEffect(() => {
        const currentRoute = data.find(button => button.link === routePath);
        uiMethods.changeActiveRoute(currentRoute);
    }, [routePath]);

    return (
        <StyledNavigation
            data-db-el="navigation"
        >
            {renderNavigationButtons()}
        </StyledNavigation>
    );

};

export default Navigation;