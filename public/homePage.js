const logoutButton = new LogoutButton()
logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload()
		}
	})
}

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
	}
})

const ratesBoard = new RatesBoard()
ratesBoard.action = () => {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable()
			ratesBoard.fillTable(response.data)
		}
	})
}
ratesBoard.action()
setInterval(() => ratesBoard.action(), 60000)

const moneyManager = new MoneyManager()
moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data)
			moneyManager.setMessage(response, 'Успех')
		} else {
			moneyManager.setMessage(response, 'Ошибка')
		}
	})
}
moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data)
			moneyManager.setMessage(response, 'Успех')
		} else {
			moneyManager.setMessage(response, 'Ошибка')
		}
	})
}
moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data)
			moneyManager.setMessage(response, 'Успех')
		} else {
			moneyManager.setMessage(response, 'Ошибка')
		}
	})
}

const favoritesWidget = new FavoritesWidget()
ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable()
		favoritesWidget.fillTable(response.data)
		moneyManager.updateUsersList(response.data)
	}
})
favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoritesWidget.setMessage(response, 'Успех')
			favoritesWidget.clearTable()
			favoritesWidget.fillTable(response.data)
			moneyManager.updateUsersList(response.data)
		} else {
			favoritesWidget.setMessage(response, 'Ошибка')
		}
	})
}
favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoritesWidget.setMessage(response, 'Успех')
			favoritesWidget.clearTable()
			favoritesWidget.fillTable(response.data)
			moneyManager.updateUsersList(response.data)
		} else {
			favoritesWidget.setMessage(response, 'Ошибка')
		}
	})
}
