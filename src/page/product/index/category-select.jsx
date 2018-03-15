import React      from 'react';
import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      = new MUtil();
const _product = new Product();
import './category-select.scss';

class CategorySelect extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         firstCategoryList : [],
         firstCategoryId   : 0,
         secondCategoryList: [],
         secondCategoryId  : 0
      }
   }
   componentDidMount(){
      this.loadFirstCategory();
   }
   componentWillReceiveProps(nextProps){
      let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
         parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
      // 数据没有发生变化的时候，直接不做处理
      if(!categoryIdChange && !parentCategoryIdChange){
         return;
      }
      // 假如只有一级品类
      if(nextProps.parentCategoryId === 0){
         this.setState({
            firstCategoryId     : nextProps.categoryId,
            secondCategoryId    : 0
         });
      }
      // 有两级品类
      else{
         this.setState({
            firstCategoryId     : nextProps.parentCategoryId,
            secondCategoryId    : nextProps.categoryId
         }, () => {
            parentCategoryIdChange && this.loadSecondCategory();
         });
      }

   }
   //加载一级分类
   loadFirstCategory(){
      _product.getCategoryList().then(res => {
         this.setState({
            firstCategoryList : res
         });
      },errMsg => {
         _mm.errorTip(errMsg);
      })
   }
   //加载二级分类
   loadSecondCategory(){
      _product.getCategoryList(this.state.firstCategoryId).then(res => {
         this.setState({
            secondCategoryList : res
         });
      },errMsg => {
         _mm.errorTip(errMsg);
      })
   }
   //选择一级分类
   onFirstCategoryChange(e){
      if(this.props.readOnly){
         return;
      }
      let newValue = e.target.value || 0;
      this.setState({
         firstCategoryId   : newValue,
         secondCategoryList: [],
         secondCategoryId  : 0
      },() => {
         this.loadSecondCategory();
         this.loadPropsCategoryChange();
      })
   }
   //选择二级分类
   onSecondCategoryChange(e){
      if(this.props.readOnly){
         return;
      }
      let newValue = e.target.value || 0;
      this.setState({
         secondCategoryId : newValue
      },() => {
         this.loadPropsCategoryChange();
      })
   }
   //传给父组件选中的结果=
   loadPropsCategoryChange(){
      //判断props中的回调函数是否存在
      let categoryChange = typeof this.props.onCategoryChange === 'function';
      //是否有二级品类
      if(this.state.secondCategoryList){
         categoryChange && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
      }
      //是否只有一级品类
      else{
         categoryChange && this.props.onCategoryChange(this.state.firstCategoryId,0);
      }
   }
   render(){
      return(
         <div className="col-sm-10">
            <select className="form-control cate-select" onChange={(e) =>
               this.onFirstCategoryChange(e)} value={this.state.firstCategoryId}
            onChange={e => this.onFirstCategoryChange(e)} readOnly={this.props.readOnly}>
               <option value="">请选择一级分类</option>
               {
                  this.state.firstCategoryList.map((category,index) =>
                     <option value={category.id} key={index}>{category.name}</option>)
               }
            </select>
            {this.state.secondCategoryList.length ?
               (< select className="form-control cate-select" onChange={(e) =>
               this.onSecondCategoryChange(e)} value={this.state.secondCategoryId}
               onChange={e => this.onSecondCategoryChange(e)} readOnly={this.props.readOnly}>
                  <option value="">请选择其他分类</option>
                  {
                     this.state.secondCategoryList.map((category, index) =>
                        <option value={category.id} key={index}>{category.name}</option>)
                  }
               </select>) : null
            }
         </div>
      )
   }
}

export default CategorySelect;