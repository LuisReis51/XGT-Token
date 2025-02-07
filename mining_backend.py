from flask import Flask, jsonify, request
from web3 import Web3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Contract configuration
CONTRACT_ADDRESS = '0x654E38A4516F5476D723D770382A5EaF8Bae0e0D'
BSC_RPC = 'https://bsc-dataseed.binance.org/'

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(BSC_RPC))

# Contract ABI
CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "mine",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"type": "address", "name": "account"}],
        "name": "balanceOf",
        "outputs": [{"type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"type": "address", "name": ""}],
        "name": "lastMinedBlockByMiner",
        "outputs": [{"type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
]

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

@app.route('/api/balance/<address>')
def get_balance(address):
    try:
        if not w3.is_address(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        balance = contract.functions.balanceOf(address).call()
        return jsonify({
            'balance': w3.from_wei(balance, 'ether'),
            'address': address
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/can_mine/<address>')
def can_mine(address):
    try:
        if not w3.is_address(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        last_mined = contract.functions.lastMinedBlockByMiner(address).call()
        current_block = w3.eth.block_number
        blocks_passed = current_block - last_mined
        
        return jsonify({
            'can_mine': blocks_passed >= 5,
            'blocks_to_wait': max(0, 5 - blocks_passed),
            'current_block': current_block,
            'last_mined': last_mined
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mine', methods=['POST'])
def mine():
    try:
        data = request.get_json()
        address = data.get('address')
        
        if not w3.is_address(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        # Get mining status
        last_mined = contract.functions.lastMinedBlockByMiner(address).call()
        current_block = w3.eth.block_number
        
        if current_block - last_mined < 5:
            return jsonify({
                'error': 'Must wait 5 blocks between mining attempts',
                'blocks_to_wait': 5 - (current_block - last_mined)
            }), 400
        
        # Return transaction data for frontend to sign
        tx = contract.functions.mine().build_transaction({
            'from': address,
            'nonce': w3.eth.get_transaction_count(address),
            'gas': 200000,
            'gasPrice': w3.eth.gas_price
        })
        
        return jsonify({
            'transaction': {
                'to': CONTRACT_ADDRESS,
                'data': tx['data'].hex(),
                'gas': tx['gas'],
                'gasPrice': tx['gasPrice']
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
