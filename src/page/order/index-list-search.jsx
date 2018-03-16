import React from 'react';

class ListSearch extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         orderNumber : ''
      }
   }
   onValueChange(e){
      let name = e.target.name,
         value = e.target.value;
      this.setState({
         [name] : value
      });
   }
   onSearch(){
      this.props.onSearch(this.state.orderNumber);
   }
   onSearchKeyUp(e){
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
                     <select className="form-control"
                             onChange={(e) => this.onValueChange(e)}>
                        <option value="productId">按订单查询</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <input type="text" className="form-control" name="orderNumber"
                            onKeyUp={(e) => this.onSearchKeyUp(e)}
                            placeholder="订单号" onChange={(e) => this.onValueChange(e)}/>
                  </div>
                  <button type="submit" className="btn btn-primary"
                          onClick={(e) => this.onSearch()}>查询</button>
               </div>
            </div>
         </div>
      )
   }
}

export default ListSearch;