import React          from 'react';
import PageTitle      from "component/page-title/index.jsx";
import CategorySelect from "./category-select.jsx";
import MUtil      from 'util/mm.jsx'
import Product    from 'service/product-service.jsx';

const _mm   = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         id : this.props.match.params.pid,
         categoryId: 0,
         parentCategoryId: 0,
         name : '',
         subtitle : '',
         subImages : [],
         price : '',
         stock : '',
         detail : '',
         status : 1
      }
   }
   componentDidMount(){
      this.loadProduct();
   }
   loadProduct(){
      //有id的时候表示的是商品编辑功能，需要进行表单回填
      if(this.state.id){
         _product.getProduct(this.state.id).then(res => {
            let images = res.subImages.split(',');
            res.subImages = images.map(imgUri => {
               return{
                  uri : imgUri,
                  url : res.imageHost + imgUri
               }
            });
            this.setState(res);
         },errMsg => {
            _mm.errorTip(errMsg);
         })
      }
   }
   render(){
      return(
         <div id="page-wrapper">
            <PageTitle title="添加商品"/>
            <div className="form-horizontal">
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品名称</label>
                  <div className="col-sm-5">
                     <p className="form-control-static">{this.state.name}</p>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品描述</label>
                  <div className="col-sm-5">
                     <p className="form-control-static">{this.state.subtitle}</p>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">所属分类</label>
                  <CategorySelect readOnly categoryId={this.state.categoryId}
                                  parentCategoryId={this.state.parentCategoryId}/>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品价格</label>
                  <div className="col-sm-3">
                     <div className="input-group">
                        <input type="text" className="form-control"
                               readOnly value={this.state.price}/>
                        <span className="input-group-addon" id="basic-addon2">元</span>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品库存</label>
                  <div className="col-sm-3">
                     <div className="input-group">
                        <input type="number" className="form-control"
                               readOnly value={this.state.stock}/>
                        <span className="input-group-addon">件</span>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品图片</label>
                  <div className="col-md-10 wrap-img">
                     {
                        this.state.subImages.length ? this.state.subImages.map((image,index) =>
                           (<div className="img-con" key={index}>
                              <img src={image.url} className="img"/>
                           </div>)) : <div>没有图片</div>
                     }
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品详情</label>
                  <div className="col-sm-10" dangerouslySetInnerHTML={{__html : this.state.detail}}>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ProductDetail;
