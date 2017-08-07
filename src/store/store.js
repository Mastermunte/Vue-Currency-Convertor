import Vue from 'vue'
import Vuex from 'vuex'

import money from 'money'
import axios from 'axios'
import localStorage from 'localStorage'
import moment from 'moment'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		transactions: [],
		transactionMsg: 'New Transaction',
		currencyData: money,
		currencies: [],
		toast: {
			isVisible: true,
			class: 'info',
			message: ''
		},
		storageConvLimit: 10
	},
	getters: {
		transactionMsg(state) {
			return state.transactionMsg;
		},
		transactions(state) {
			return state.transactions;
		},
		currencies(state) {
			return state.currencies;
		},
		toast(state) {
			return state.toast;
		}
	},
	mutations: {
		initializeRates(state, payload) {
			state.currencyData.rates = payload.rates;
			state.currencyData.base = payload.base;
			state.currencies = Object.keys(payload.rates).map(function(curr) {
				return {name: curr}
			});
		},
		initializeTransactions(state) {
			const cachedTransactions = localStorage.get('transactions');
			state.toast.message = 'You can save up to ' + state.storageConvLimit + ' conversions, which will be stored for an unlimited time.'
			if (cachedTransactions) {
				state.transactions = cachedTransactions;

				if (cachedTransactions.length >= state.storageConvLimit) {
					state.toast = {
						isVisible: true,
						class: 'warning',
						message: 'You have reached the limit of ' + state.storageConvLimit + ' conversions available in storage. Further conversions will not be saved until the store is reset.'
					}
				}
			}
		},
		convert(state, payload) {
			const result = (state.currencyData.convert(payload.quantity, {from: payload.baseCurr, to: payload.desiredCurr})).toFixed(2);
			state.transactionMsg = payload.quantity + ' ' + payload.baseCurr + ' = ' +  result + ' ' + payload.desiredCurr;
			if (state.transactions.length >= state.storageConvLimit-1) {
				state.toast = {
					isVisible: true,
					class: 'warning',
					message: 'You have reached the limit of ' + state.storageConvLimit + ' conversions available in storage. Further conversions will not be saved until the store is reset.'
				}
			}
			if (state.transactions.length <= state.storageConvLimit-1) {
				state.transactions.push({
					date: moment().format('DD/MM/YYYY, hh:mm:ss'),
					from: payload.quantity + ' ' + payload.baseCurr,
					to: result + ' ' + payload.desiredCurr
				})
				localStorage.set('transactions', state.transactions);
			}
		},
		clearStorage(state) {
			localStorage.remove('transactions');
			state.transactions = [];
		},
		hideToast(state) {
			state.toast.isVisible = false;
		}
	},
	actions: {
		initializeRates({ commit }, initData) {
	  	axios.get('http://api.fixer.io/latest').then((response) => {commit('initializeRates', response.data);})
		}
	}
})