import React from 'react';
import {Icon, Menu, Dropdown, Responsive, Item} from "semantic-ui-react";

const Header = (props) => {

    const userMenuOptions = [{ key: 'sign-out', text: 'Çıkış Yap', icon: 'sign out' }];

    const userMenu = (
        <React.Fragment>
            <Responsive as={Item.Content} minWidth={768} verticalAlign="middle">
                {/*<div className="user-name">{props.user != null ? props.user.nameAndSurname : ""}</div>*/}
                {/*<span className="user-role">{props.user != null ? props.user.service : ""}</span>*/}
                <div className="user-name">Murat YILMAZ</div>
                <span className="user-role">Guru</span>
            </Responsive>
        </React.Fragment>
    );

    const onSolveItemClick = () => {
        const url = '/coz';
        var win = window.open(url, '_self');
        win.focus();
        props.setActiveTab('solve');
    }

    const onAddItemClick = () => {
        const url = '/ekle';
        var win = window.open(url, '_self');
        win.focus();
        props.setActiveTab('add');
    }

    return (
        <Menu id="header"
              inverted>
            <Menu.Item className="name" onClick={onSolveItemClick}>
                <Icon link name="pencil"
                    // onClick={this.props.navCollapse}
                />
                Bulmaca Çöz
            </Menu.Item>

            <Menu.Item onClick={onAddItemClick}>
                <Icon link name="add"
                    // onClick={this.props.navCollapse}
                />
                Bulmaca Ekle
            </Menu.Item>

            <Menu.Menu position="right">

                <Dropdown className="link item selection user"
                          trigger={userMenu}
                          icon={null}>
                    <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                            {userMenuOptions.map(option => (
                                <Dropdown.Item
                                    // onClick={this.openLoggoutTab}
                                    key={option.key} {...option} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;
