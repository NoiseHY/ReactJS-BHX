import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/header';

import User_CartDetails from './details';

function user_cart(){
  return (
    <>
      <Header></Header>

      <User_CartDetails></User_CartDetails>
      
    </>
  )
}

export default user_cart;