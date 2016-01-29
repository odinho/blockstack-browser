import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { PublicKeychain } from 'keychain-manager'

import { KeychainActions } from '../store/keychain'

function mapStateToProps(state) {
  return {
    accountKeychain: state.keychain.bitcoinAccounts[0].accountKeychain,
    addressIndex: state.keychain.bitcoinAccounts[0].addressIndex
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(KeychainActions, dispatch)
}

class WalletPage extends Component {
  static propTypes = {
    accountKeychain: PropTypes.string.isRequired,
    addressIndex: PropTypes.number.isRequired,
    newBitcoinAddress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.refreshAddress = this.refreshAddress.bind(this)
  }

  refreshAddress(event) {
    this.props.newBitcoinAddress()
  }

  render() {
    const balance = 0

    return (
      <div>
        <h2>Wallet</h2>
        <hr />
        <h5>Balance</h5>
        <div className="highlight">
          <pre>
            <code>{balance} mBTC</code>
          </pre>
        </div>
        <p>
          <i>Note: The balance is displayed in bits. Each bit is 1/1000th of a bitcoin.</i>
        </p>
        <p>
          <Link to="/wallet/deposit" className="btn btn-primary">
            Deposit
          </Link>
        </p>
        <p>
          <Link to="/wallet/withdraw" className="btn btn-secondary">
            Withdraw
          </Link>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage)