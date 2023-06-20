import React, { useContext } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserConext } from "../../../../context/UserContext";

const ClientOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersPayed,
    ordersDispatched,
    ordersDelivery,
    getOrderByClientAndStatus,
  } = useContext(OrderContext);

  const {user} = useContext(UserConext)

  const getOrders = async (idClient:string, status: string) => {
    const result = await getOrderByClientAndStatus(idClient,status);
    //setOrders(result);
    console.log("ORDERS : " + JSON.stringify(result, null, 3));
  };
  return {
    ordersPayed,
    ordersDispatched,
    ordersDelivery,
    getOrders,
    user
  };
};

export default ClientOrderListViewModel;
