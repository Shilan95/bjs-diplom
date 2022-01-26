'use strict'

const newLogoutButton = new LogoutButton();
const newRatesBoard = new RatesBoard();
const newMoneyManager = new MoneyManager();
const newFavoritesWidget = new FavoritesWidget();

newLogoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success)
      location.reload();
  })
}
ApiConnector.current((response) => {
  if (response.success)
    ProfileWidget.showProfile(response.data);
})

newRatesBoard.getCourses = () => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      newRatesBoard.clearTable();
      newRatesBoard.fillTable(response.data);
    }
  })
}
newRatesBoard.getCourses();
setInterval(newRatesBoard.getCourses, 60000);

newMoneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства добавлены не были!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Сумма добавлена!`);
  })
}

newMoneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data,response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства не конвертированы!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Средства конвертированы!`);
  })
}
newMoneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства не переведены!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Средства переведены!`);
  })
}
