'use strict'

const newLogoutObj = new LogoutButton();
const newRatesBoard = new RatesBoard();
const newMoneyManager = new MoneyManager();
const newFavoritesWidget = new FavoritesWidget();

newLogoutObj.action = () => {
  ApiConnector.logout((response) => {
    if (response.success)
      location.reload();
  })
}

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }else {
    console.log(response.error);
  }
})

newRatesBoard.getCourses = () => {
  ApiConnector.getStocks(response => {
    if (response.success === true) {
      newRatesBoard.clearTable();
      newRatesBoard.fillTable(response.data);
    }else {
      console.log(response.error);
    }
  })
}
newRatesBoard.getCourses();
setInterval(newRatesBoard.getCourses, 60000);

newMoneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response.success, `Сумма добавлена!`);
    }else {
      moneyManager.setMessage(response.success, response.error);
  }
  })
}

newMoneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data,response => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response.success, `Средства конвертированы!`);
    }else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}
newMoneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response.success, `Средства переведены!`);
    }else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

(function newDataFavorites() {
  ApiConnector.getFavorites(response => {
    if (response.success === true) {
      newFavoritesWidget.clearTable();
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
    }
  })
})();

newFavoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data,response => {
    if (response.success === true) {
      newFavoritesWidget.clearTable();
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
      newFavoritesWidget.setMessage(response.success, `Пользователь добавлен!`);
    }else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}

newFavoritesWidget.removeUserCallback = id => {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success === true) {
      newFavoritesWidget.clearTable();
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
      newFavoritesWidget.setMessage(response.success, `Пользователь удален!`);
    }else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}