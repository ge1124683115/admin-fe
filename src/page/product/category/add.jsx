import React from 'react';
import {Link}    from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Product   from 'service/product-service.jsx';
import MUtil     from 'util/mm.jsx';

const _product = new Product();
const _mm      = new MUtil();

class CategoryAdd extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         categoryList : [],
         parentId     : 0,
         categoryName : ''
      }
   }
   componentDidMount(){
      this.loadCategoryList();
   }
   //加载品类列表
   loadCategoryList(){
      _product.getCategoryList().then(res => {
         this.setState({
            categoryList : res
         });
      },errMsg => {
         _mm.errorTip(errMsg);
      });
   }
   onValueChange(e){
      let name = e.target.name,
         value = e.target.value;
      this.setState({
         [name] : value
      })
   }
   //进行品类的提交
   onSubmit(e){
      let categoryName = this.state.categoryName.trim();
      //如果品类名称不为空
      if(categoryName){
         _product.saveCategory({
            parentId : this.state.parentId,
            categoryName:this.state.categoryName
         }).then(res => {
            _mm.successTip(res);
            this.props.history.push('/product-category/index');
         },errMsg => {
            _mm.errorTip(errMsg);
         })
      }else{
         _mm.errorTip('请输入品类名称');
      }
   }
   render(){
      return(
         <div id="page-wrapper">
            <PageTitle title="品类管理-添加品类"/>
            <div className="row">
               <div className="col-md-12">
                  <div className="form-horizontal">
                     <div className="form-group">
                        <label className="col-sm-2 control-label">所属品类</label>
                        <div className="col-sm-4">
                           <select className="form-control" name="parentId"
                           onChange={e => this.onValueChange(e)}>
                              <option value="0">根品类/</option>
                              {
                                 this.state.categoryList.map((category,index) => {
                                    return <option value={category.id} key={index}>根品类/{category.name}</option>
                                 })
                              }
                           </select>

                        </div>
                     </div>
                     <div className="form-group">
                        <label className="col-sm-2 control-label">品类名称</label>
                        <div className="col-sm-3">
                           <input type="text" className="form-control"
                                  name="categoryName" placeholder="请输入品类名称"
                                  value={this.state.name}
                                  onChange={(e) => this.onValueChange(e)}/>
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                           <button type="submit" className="btn btn-primary"
                                   onClick={(e) => this.onSubmit(e)}>提交</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default CategoryAdd;