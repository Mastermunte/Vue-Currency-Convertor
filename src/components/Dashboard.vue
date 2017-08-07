<template>
  <div id="dashboard">
    <h2><slot></slot></h2>
    <form @submit.prevent="convert">
      <div class="display-wrapper">
        <p>{{ transactionMsg }}</p>
      </div>
      <div class="quantity-wrapper field">
        <div class="control">
          <div class="ibl" v-bind:class="{ error : errors.qty }">
            <input type="number" min="0" placeholder="Quantity" v-model.number="quantity" step=0.01 />
            <span class="base-curr">{{ baseCurr }}</span>
          </div>
        </div>
      </div>
      <div class="currencies-wrapper field is-grouped">
        <div class="control">
          <div class="select">
            <select v-model="baseCurr" v-bind:class="{ error : errors.from }">
              <option disabled value="">Base Currrency</option>
              <option v-for="c in currencies">{{ c.name }}</option>
            </select>
          </div>
        </div>
        <div class="control separator">
          <span>to</span>
        </div>
        <div class="control">
          <div class="select">
            <select v-model="desiredCurr" v-bind:class="{ error : errors.to }">
              <option disabled value="">Desired Currrency</option>
              <option v-for="c in currencies">{{ c.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="submit-wrapper field">
        <div class="control">
          <input class="button is-primary" type="submit" value="Convert">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      quantity: 0,
      baseCurr: '',
      desiredCurr: '',
      errors: {
        qty: false,
        from: false,
        to: false
      }
    }
  },
  computed: {
    params() {
      return {
        quantity: this.quantity,
        baseCurr: this.baseCurr,
        desiredCurr: this.desiredCurr
      }
    },
    transactionMsg() {
      return this.$store.getters.transactionMsg;
    },
    currencies() {
      return this.$store.getters.currencies;
    }
  },
  methods: {
    applyErrors() {
      if (!this.quantity) {
        this.errors.qty = true;
      } else if (!this.baseCurr) {
        this.errors.from = true;
      } else if (!this.desiredCurr) {
        this.errors.to = true;
      }
    },
    resetErrors() {
      this.errors.qty = false;
      this.errors.from = false;
      this.errors.to = false;
    },
    resetInputs() {
      this.quantity = 0;
      this.baseCurr = '';
      this.desiredCurr = '';
    },
    convert() {
      this.resetErrors();
      if (this.quantity && this.baseCurr && this.desiredCurr) {
        this.$store.commit('convert', this.params);
        this.resetInputs();
      } else this.applyErrors();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#dashboard {
  padding: 30px;
  background-color: #d5d5d5;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

#dashboard > h2 {
  font-size: 16px;
  text-align: left;
}

.currencies-wrapper {
  justify-content: space-between;
  align-items: center;
}

.currencies-wrapper.field .control {
  width: 40%;
  margin-right: 0;
}

.currencies-wrapper.field .control.separator {
  width: 20%;
}

.currencies-wrapper .select {
  width: 100%;
}

.currencies-wrapper select {
  width: 100%;
}

.display-wrapper p {
  font-size: 36px;
  margin: 1.5em 0;
  line-height: 1.2;
}

form .field:not(:last-child) {
  margin-bottom: 2em;
}

form .control {
  text-align: center;
}

.ibl {
  display: inline-block;
}

.quantity-wrapper .ibl {
  border-radius: 3px;
  border: 1px solid transparent;
}

.quantity-wrapper .ibl.error,
.currencies-wrapper select.error {
  border: 1px solid rgb(255,34,34);
}

.quantity-wrapper .control {
  font-size: 0;
}

.quantity-wrapper input {
  line-height: 36px;
  height: 36px;
  font-size: 20px;
  vertical-align: top;
  padding-left: 15px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: none;
}

.base-curr {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 36px;
  height: 36px;
  background-color: #c9c9c9;
  border: 1px solid #999;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 50px;
  vertical-align: top;
}

.submit-wrapper .button {
  width: 125px;
  margin-bottom: 1em;
}

</style>