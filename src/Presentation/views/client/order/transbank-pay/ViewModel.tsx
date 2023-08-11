import { Order } from "../../../../../Domain/entities/Order";

const ClientOrderPayTransbankViewModel = (order: Order) => {
  const getVciMessage = (vci: string) => {
    switch (vci) {
      case "TSY":
        return "Exitosa";
      case "TSN":
        return "Rechazada";
      case "NP":
        return "No fue autenticada";
      case "U3":
        return "Rechazada por temas internos";
      case "INV":
        return "Datos Inválidos";
      case "A":
        return "Intentó";
      case "CNP1":
        return "Comercio no participa";
      case "EOP":
        return "Error operacional";
      case "BNA":
        return "BIN no adherido";
      case "ENA":
        return "Emisor no adherido";
      default:
        return "Desconocido";
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "INITIALIZED":
        return "Inicializada";
      case "AUTHORIZED":
        return "Autorizada";
      case "REVERSED":
        return "Revertida";
      case "FAILED":
        return "Fallida";
      case "NULLIFIED":
        return "Anulada";
      case "PARTIALLY_NULLIFIED":
        return "Anulada parcialmente";
      case "CAPTURED":
        return "Capturada";
      default:
        return "Desconocido";
    }
  };

  const getPaymentTypeCode = (status: string) => {
    switch (status) {
      case "VD":
        return "Venta por Débito";
      case "VN":
        return "Venta Normal";
      case "VC":
        return "Venta en cuotas";
      case "SI":
        return "3 cuotas sin interés";
      case "S2":
        return "2 cuotas sin interés";
      case "NC":
        return "N Cuotas sin interés";
      case "VP":
        return "Venta Prepago";
      default:
        return "Desconocido";
    }
  };

  const vciMessage = getVciMessage(order.transbank?.vci || "");
  const statusMessage = getStatusMessage(order.transbank?.status || "");
  const paymentTypeCode = getPaymentTypeCode(
    order.transbank?.payment_type_code || ""
  );

  const transactionDate = new Date(order.transbank?.transaction_date!);
  const formattedTransactionDate = transactionDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const accountingDate = `${order.transbank?.accounting_date.slice(
    2,
    4
  )}/${order.transbank?.accounting_date.slice(0, 2)}`;

  const showInstallments =
    order.transbank?.installments_number !== 0 &&
    order.transbank?.installments_number !== null;

  return {
    vciMessage,
    statusMessage,
    formattedTransactionDate,
    paymentTypeCode,
    accountingDate,
    showInstallments,
  };
};

export default ClientOrderPayTransbankViewModel;
