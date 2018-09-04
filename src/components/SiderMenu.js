import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = item => (    // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.key}
        appName={item.title}
    >
        <Link to={item.route || item.key}>   
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = (item,selectedKeys) => ( 
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
        appName={item.title}
    >
        {item.subs.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

export default ({ menus, ...props }) => (
    
    <Menu {...props}>
        {menus && menus.map(item => 
            item.subs ? renderSubMenu(item,props.selectedKeys) : renderMenuItem(item)
        )}
    </Menu>
);