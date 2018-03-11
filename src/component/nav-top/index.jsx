import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

class Layout extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         username : _mm.getStorage('userInfo').username || ''
      }
   }
   //退出登录
   onLogout(){
      _user.logout().then(res => {
         _mm.removeStorage('userInfo');
         window.location.href = '/login';
      },errMsg => {
         _mm.errorTip(errMsg);
      });
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
                        {
                           this.state.username ? <span>欢迎, {this.state.username}</span>
                              : <span>欢迎您</span>
                        }
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