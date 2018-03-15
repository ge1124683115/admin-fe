import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList  from 'util/table-list/index.jsx';
import MUtil      from 'util/mm.jsx'
import Product    from 'service/product-service.jsx'
import './index.scss';

const _mm      = new MUtil();
const _product = new Product();

class ProductList extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         list         : [],
         pageNum      : 1,
         listType     : 'list'
      }
   }
   componentDidMount(){
      this.loadProductList();
   }
   loadProductList(){
      let listParam = {};
      listParam.listType = this.state.listType;
      listParam.pageNum  = this.state.pageNum;
      if(this.state.listType == 'search'){
         listParam.searchType = this.state.searchType;
         listParam.keyword = this.state.searchKeyword;
      }
      _product.getProductList(listParam).then(res => {
         this.setState(res);
      },errMsg => {
         this.setState({
            list : []
         });
         _mm.errorTip(errMsg);
      })
   }
   onSearch(searchKeyword,searchType){
      let listType = searchKeyword === '' ? 'list' : 'search';
      this.setState({
         listType      : listType,
         pageNum       : 1,
         searchKeyword : searchKeyword,
         searchType    : searchType
      },() => {
         this.loadProductList();
      });
   }
   //当页面发生变化的时候
   onPageNumChange(pageNum){
      this.setState({
         pageNum : pageNum
      },() => {
         this.loadProductList();
      })
   }
   //改变商品的上下架状态
   onSetProductStatus(e,productId,currentStatus){
      let newStatus   = currentStatus == 1 ? 2 : 1;
      let confirmTips = currentStatus == 1 ? '确认要下架该商品吗？' : '确认要上架该商品吗？';
       if(window.confirm(confirmTips)){
          _product.setProductStatus({
             productId : productId,
             status    : newStatus
          }).then(res => {
             _mm.successTip(res);
             this.loadProductList();
          },errMsg => {
             _mm.errorTip(errMsg);
          })
       }
   }

   render(){
      let tableHeaders = [
         {name : 'id',width : '10%'},
         {name : '信息',width : '50%'},
         {name : '价格',width : '10%'},
         {name : '状态',width : '15%'},
         {name : '操作',width : '15%'},
      ]
      return(
         <div id="page-wrapper">
            <PageTitle title="商品列表">
               <div className="page-header-right">
                  <Link className="btn btn-primary" to="/product/save">
                     <i className="fa fa-plus"></i>
                     <span>添加商品</span>
                  </Link>
               </div>
            </PageTitle>
            <ListSearch onSearch={(searchKeyword,searchType) => {this.onSearch(searchKeyword,searchType)}}/>
            <TableList tableHeaders = {tableHeaders}>
               {
                  this.state.list.map((product,index) => {
                     return(
                        <tr key={index}>
                           <td>{product.id}</td>
                           <td>
                              <p>{product.name}</p>
                              <p>{product.subtitle}</p>
                           </td>
                           <td>{product.price}</td>
                           <td>
                              <span>{product.status == 1 ? '在售 ' : '已下架 '}</span>
                              <button className="btn-warning btn-xs btn" onClick={(e) =>
                              {this.onSetProductStatus(e,product.id,product.status)}}>
                                 {product.status == 1 ? '下架' : '上架'}
                              </button>
                           </td>
                           <td>
                              <Link to={`/product/detail/${product.id}`}> 查看</Link>
                              &nbsp;&nbsp;
                              <Link to={`/product/save/${product.id}`}> 编辑</Link>
                           </td>
                        </tr>
                     );
                  })
               }
            </TableList>
            <Pagination
               defaultPageSize={10}
               defaultCurrent={this.state.pageNum}
               total={this.state.total}
               onChange={(pageNum) => this.onPageNumChange(pageNum)}
            />
         </div>
      );
   }
}

export default ProductList;
