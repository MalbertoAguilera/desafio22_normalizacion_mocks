var socket = io();

socket.on("server_sendProducts", (arrProducts) => {
  renderTable(arrProducts);
});

socket.on("server_sendMessages", (arrChat) => {
  renderMessages(arrChat);
  console.log(arrChat);
});

//Funciones CHAT

const addInfo = () => {
  let objMessage =
  {
    author: {
      id: document.querySelector("#id").value,
      nombre: document.querySelector("#nombre").value,
      apellido: document.querySelector("#apellido").value,
      edad: document.querySelector("#edad").value,
      avatar: "https://picsum.photos/50",
      alias: document.querySelector("#alias").value
    },
    text: document.querySelector("#text").value
  } ;
  
  socket.emit("client_newMessage", objMessage);
  document.querySelector("#text").value = "";
  return false;
};

const renderMessages = (objChat) => {

  const arrayMensajes = objChat.mensajes;

  let html = arrayMensajes.map((message) => {
    return `<p><img src="${message.author.avatar}"> <strong style="color: blue">${message.author.alias}: </strong> <span style="color: brown">[${message.author.date}]</span> <span style="color: green"> <em>${message.text} </em> </span> </p>`;
  }).join("");

  document.querySelector("#boxMessages").innerHTML = html;
};

//funciones PRODUCTOS

const addProduct = () => {
  let objMsn =
  {
      title: document.querySelector("#title").value,
      price:document.querySelector("#price").value,
      thumbnail:"https://picsum.photos/50"
    };

  socket.emit("client_newProduct", objMsn)

  document.querySelector("#title").value ="";
  document.querySelector("#price").value ="";
  document.querySelector("#thumbnail").value ="";

  return false;
}

const renderTable = (data) => {
  let table = data
    .map((item) => {
      return `
        <tr>
          <th scope="row">${item.title}</th>
          <td>$${item.price}</td>
          <td>
            <img
              src="${item.thumbnail}"
              alt="${item.title}"
            />
          </td>
        </tr>`;
    })
    .join(" ");
  document.querySelector("#itemsTable").innerHTML = table;
};
