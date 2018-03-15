import React          from 'react';
import PageTitle      from "component/page-title/index.jsx";
import CategorySelect from "./category-select.jsx";
import FileUploader   from 'util/file-uploader/index.jsx';
import MUtil      from 'util/mm.jsx'
import Product    from 'service/product-service.jsx';
import RichEditor from "util/rich-editor/index.jsx";

const _mm   = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
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
            res.defaultDetail = res.detail;
            this.setState(res);
         },errMsg => {
            _mm.errorTip(errMsg);
         })
      }
   }
   //对商品名称、价格、库存等简单字段的验证
   onValueChange(e){
      let name = e.target.name,
         value = e.target.value;
      this.setState({
         [name] : value
      })
   }
   onCategoryChange(categoryId,parentCategoryId){
      this.setState({
         categoryId       : categoryId,
         parentCategoryId : parentCategoryId
      });
   }
   onUploadSuccess(res){
      let subImages = this.state.subImages;
      subImages.push(res);
      this.setState({
         subImages : subImages
      })
   }
   onUploadError(errMsg){
      _mm.errorTip(errMsg);
   }
   //删除图片
   onImageDelete(e){
      let index = e.target.getAttribute('index'),
         subImages = this.state.subImages;
      subImages.splice(index,1);
      this.setState({
         subImages : subImages
      })
   }
   //富文本编辑器的变化
   onDetailValueChange(value){
      console.log(value);
      this.setState({
         detail : value
      });
   }
   //将传入的图片转成字符串的格式
   getSubImageString(){
      return this.state.subImages.map(image => image.uri).join(',');
   }
   //提交表单
   onSubmit(){
      let product = {
         categoryId: parseInt(this.state.categoryId),
         name : this.state.name,
         subtitle : this.state.subtitle,
         subImages : this.getSubImageString(),
         price : parseInt(this.state.price),
         stock : parseInt(this.state.stock),
         detail : this.state.detail,
         status : this.state.status
      };
      console.log(product);
      let productCheckResult = _product.checkProduct(product);
      if(this.state.id){
         product.id = this.state.id;
      }
      //表单验证成功
      if(productCheckResult.status){
         _product.saveProduct(product).then(res => {
            _mm.successTip(res);
            this.props.history.push('/product/index');
         },errMsg => {
            _mm.errorTip(errMsg);
         })
      }else{
         _mm.errorTip(productCheckResult.msg);
      }
   }
   render(){
      return(
         <div id="page-wrapper">
            <PageTitle title = {this.state.id ? '编辑商品' : '添加商品'}/>
            <div className="form-horizontal">
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品名称</label>
                  <div className="col-sm-5">
                     <input type="text" className="form-control"
                            name="name" placeholder="请输入商品名称"
                            value={this.state.name}
                     onChange={(e) => this.onValueChange(e)}/>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品描述</label>
                  <div className="col-sm-5">
                     <input type="text" className="form-control"
                            name="subtitle" placeholder="请输入商品描述"
                            value={this.state.subtitle}
                            onChange={(e) => this.onValueChange(e)}/>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">所属分类</label>
                  <CategorySelect onCategoryChange={(categoryId,parentCategoryId) =>
                     this.onCategoryChange(categoryId,parentCategoryId)}
                  categoryId={this.state.categoryId}
                  parentCategoryId={this.state.parentCategoryId}/>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品价格</label>
                  <div className="col-sm-3">
                     <div className="input-group">
                        <input type="text" className="form-control"
                               name="price" placeholder="价格"
                               value={this.state.price}
                               onChange={(e) => this.onValueChange(e)}/>
                        <span className="input-group-addon" id="basic-addon2">元</span>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品库存</label>
                  <div className="col-sm-3">
                     <div className="input-group">
                        <input type="number" className="form-control"
                               placeholder="库存" name="stock"
                               value={this.state.stock}
                               onChange={(e) => this.onValueChange(e)}/>
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
                              <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                           </div>)) : <div>请选择图片</div>
                     }
                  </div>
                  <div className="col-md-10 offset-img">
                     <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                     onErroe={(errMsg) => this.onUploadError(errMsg)}/>
                  </div>
               </div>
               <div className="form-group">
                  <label className="col-sm-2 control-label">商品详情</label>
                  <div className="col-sm-10">
                     <RichEditor onValueChange={(value) => this.onDetailValueChange(value)}
                     detail={this.state.detail} defaultDetail={this.state.defaultDetail}/>
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
      );
   }
}

export default ProductSave;
