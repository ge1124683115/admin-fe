/*
* @Author: Rosen
* @Date:   2018-01-25 21:21:46
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 13:33:42
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Product{
   //获取商品列表
   getProductList(listParam){
      let url = '',
         data = {};
      if(listParam.listType === 'search'){
         url = '/manage/product/search.do';
         // data.pageNum = listParam.pageNum;
         data[listParam.searchType] = listParam.keyword;
      }else if(listParam.listType === 'list'){
         url = '/manage/product/list.do';
         data.pageNum = listParam.pageNum;
      }
      return _mm.request({
         type : 'post',
         url  : url,
         data : data
      });
   }
   //商品上下架
   setProductStatus(productInfo){
      return _mm.request({
         type : 'post',
         url  : '/manage/product/set_sale_status.do',
         data : productInfo
      })
   }

   //检查保存商品的数据
   checkProduct(product){
      let result = {
         status : true,
         msg    : '验证通过'
      };
      //判断商品的名称是否为空
      if(typeof product.name !== 'string' || product.name.length === 0){
         return{
            status : false,
            msg    : '商品名称不能为空'
         }
      }
      //判断商品的描述是否为空
      if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
         return{
            status : false,
            msg    : '商品描述不能为空'
         }
      }
      //选择商品的品类
      if(typeof product.categoryId !== 'number' || product.categoryId <= 0){
         return{
            status : false,
            msg    : '请选择商品的品类'
         }
      }
      //判断商品的价格为数字，且大于等于0
      if(typeof product.price !== 'number' || product.price < 0){
         return{
            status : false,
            msg    : '请输入正确的价格'
         }
      }
      //判断商品的库存为数字，且大于等于0
      if(typeof product.stock !== 'number' || product.stock < 0){
         return{
            status : false,
            msg    : '请输入正确的库存'
         }
      }
      return result;
   }
   //保存商品
   saveProduct(product){
      return _mm.request({
         type : 'post',
         url  : '/manage/product/save.do',
         data : product
      })
   }
   //获取商品详情
   getProduct(productId){
      return _mm.request({
         type : 'post',
         url  : '/manage/product/detail.do',
         data : {
            productId : productId || 0
         }
      })
   }


   //获取商品的品类
   getCategoryList(categoryListInfo){
      return _mm.request({
         type : 'post',
         url  : '/manage/category/get_category.do',
         data : categoryListInfo
      });
   }
   //修改品类名字
   updateCategoryName(category){
      return _mm.request({
         type : 'post',
         url  : '/manage/category/set_category_name.do',
         data : category
      });
   }
   //新增加品类
   saveCategory(category){
      return _mm.request({
         type : 'post',
         url  : '/manage/category/add_category.do',
         data : category
      })
   }
}

export default Product;