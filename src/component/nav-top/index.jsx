import React from 'react';


class Layout extends React.Component{
   constructor(props){
      super(props)
   }
   //退出登录
   onLogout(){

   }
   render(){
      return(
         <div id="wrapper">
            <nav className="navbar navbar-default top-navbar">
               <div className="navbar-header">
                  <a className="navbar-brand" href="index.html"><b>HAPPY</b>MMALL</a>
               </div>
               <ul className="nav navbar-top-links navbar-right">
                  <li className="dropdown">
                     <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎, admin</span>
                        <i className="fa fa-caret-down"></i>
                     </a>
                     <ul className="dropdown-menu dropdown-user">
                        <li>
                           <a onClick={()=>{this.onLogout()}}>
                              <i className="fa fa-sign-out fa-fw"></i>
                              <span> 退出登录</span>
                           </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </nav>
         </div>
      );
   }
}

export default Layout;