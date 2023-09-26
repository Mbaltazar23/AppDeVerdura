import React, { useContext } from "react";
import { OrderContext } from "../../../../context/OrderContext";

const AdminOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersPayed,
    ordersHolding,
    ordersDelivery,
    getOrderByStatus,
  } = useContext(OrderContext);

  const getOrders = async (status: string) => {
    const result = await getOrderByStatus(status);
    //setOrders(result);
    console.log("ORDERS : " + JSON.stringify(result, null, 3));
  };
  
  return {
    ordersPayed,
    ordersHolding,
    ordersDelivery,
    getOrders,
  };
};

export default AdminOrderListViewModel;
