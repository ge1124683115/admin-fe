import React           from 'react';
import {Link, NavLink} from 'react-router-dom';

class NavSide extends React.Component{
   constructor(props){
      super(props)
   }
   render(){
      return(
         <div id="wrapper">
            <nav className="navbar-default navbar-side" role="navigation">
               <div className="sidebar-collapse">
                  <ul className="nav" id="main-menu">
                     <li>
                        <NavLink exact activeClassName="active-menu" to="/">
                           <i className="fa fa-bar-chart-o"></i>
                           <span>首页</span>
                        </NavLink>
                     </li>
                     <li className="active">
                        <Link to="/product">
                           <i className="fa fa-sitemap"></i>
                           商品
                           <span className="fa arrow"></span>
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                           <li>
                              <NavLink activeClassName="active-menu" to="/product">商品管理</NavLink>
                           </li>
                           <li>
                              <NavLink activeClassName="active-menu" to="/product-category">品类管理</NavLink>
                           </li>
                        </ul>
                     </li>
                     <li className="active">
                        <Link to="/order">
                           <i className="fa fa-sitemap"></i>
                           订单
                           <span className="fa arrow"></span>
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                           <li>
                              <NavLink activeClassName="active-menu" to="/order">订单管理</NavLink>
                           </li>
                        </ul>
                     </li>
                     <li className="active">
                        <Link to="/user">
                           <i className="fa fa-sitemap"></i>
                           用户
                           <span className="fa arrow"></span>
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                           <li>
                              <NavLink activeClassName="active-menu" to="/user">用户管理</NavLink>
                           </li>
                        </ul>
                     </li>
                  </ul>

               </div>

            </nav>
         </div>
      );
   }
}

export default NavSide;