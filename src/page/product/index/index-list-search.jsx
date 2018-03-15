import React from 'react';

class ListSearch extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         searchType    : 'productId',
         searchKeyword : 'productName'
      }
   }
   onValueChange(e){
      let name = e.target.name,
         value = e.target.value.trim();
      this.setState({
         [name] : value
      })
   }
   onSearch(){
      this.props.onSearch(this.state.searchKeyword,this.state.searchType);
   }
   onSearchKeywordKeyUp(e){
      if(e.keyCode === 13){
         this.onSearch();
      }
   }
   render(){
      return(
         <div className="row from-wrap">
            <div className="col-md-12">
               <div className="form-inline">
                  <div className="form-group">
                     <select className="form-control" name="searchType"
                             onChange={(e) => this.onValueChange(e)}>
                        <option value="productId">按商品ID搜索</option>
                        <option value="productName">按商品名称搜索</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <input type="text" className="form-control" name="searchKeyword"
                            onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                            placeholder="关键词" onChange={(e) => this.onValueChange(e)}/>
                  </div>
                  <button type="submit" className="btn btn-primary"
                          onClick={(e) => this.onSearch()}>搜索</button>
               </div>
            </div>
         </div>
      )
   }
}

export default ListSearch;