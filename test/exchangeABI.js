var exchangeABI = {};
exchangeABI.abi = {
    "version": "eosio::abi/1.0",
    "types": [{
        "new_type_name": "account_name",
        "type": "name"
    }],
    "structs": [{
            "name": "extended_symbol",
            "base": "",
            "fields": [{
                    "name": "sym",
                    "type": "symbol"
                },
                {
                    "name": "contract",
                    "type": "account_name"
                }
            ]
        },
        {
            "name": "extended_asset",
            "base": "",
            "fields": [{
                    "name": "quantity",
                    "type": "asset"
                },
                {
                    "name": "contract",
                    "type": "account_name"
                }
            ]
        },
        {
            "name": "deposit",
            "base": "",
            "fields": [{
                    "name": "from",
                    "type": "account_name"
                },
                {
                    "name": "quantity",
                    "type": "extended_asset"
                }
            ]
        },
        {
            "name": "withdraw",
            "base": "",
            "fields": [{
                    "name": "admin",
                    "type": "account_name"
                },
                {
                    "name": "from",
                    "type": "account_name"
                },
                {
                    "name": "quantity",
                    "type": "extended_asset"
                },
                {
                    "name": "nonce",
                    "type": "uint64"
                }
            ]
        },
        {
            "name": "userwithdraw",
            "base": "",
            "fields": [{
                    "name": "user",
                    "type": "account_name"
                },
                {
                    "name": "quantity",
                    "type": "extended_asset"
                },
                {
                    "name": "nonce",
                    "type": "uint64"
                }
            ]
        },
        {
            "name": "testsig",
            "base": "",
            "fields": [{
                    "name": "from",
                    "type": "account_name"
                },
                {
                    "name": "message",
                    "type": "string"
                },
                {
                    "name": "digest",
                    "type": "bytes"
                },
                {
                    "name": "sig",
                    "type": "bytes"
                },
                {
                    "name": "publickey",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "registeruser",
            "base": "",
            "fields": [{
                    "name": "user",
                    "type": "account_name"
                },
                {
                    "name": "publickey",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "ispkpaired",
            "base": "",
            "fields": [{
                "name": "user",
                "type": "account_name"
            }, ]
        },
        {
            "name": "trade",
            "base": "",
            "fields": [{
                    "name": "admin",
                    "type": "account_name"
                },
                {
                    "name": "amountbuy",
                    "type": "int64"
                },
                {
                    "name": "amountsell",
                    "type": "int64"
                },
                {
                    "name": "nonce",
                    "type": "uint64"
                },
                {
                    "name": "amount",
                    "type": "int64"
                },
                {
                    "name": "tradenonce",
                    "type": "uint64"
                },
                {
                    "name": "tokenbuy",
                    "type": "extended_asset"
                },
                {
                    "name": "tokensell",
                    "type": "extended_asset"
                },
                {
                    "name": "makerfee",
                    "type": "int64"
                },
                {
                    "name": "takerfee",
                    "type": "int64"
                },
                {
                    "name": "maker",
                    "type": "account_name"
                },
                {
                    "name": "taker",
                    "type": "account_name"
                },
                {
                    "name": "feeaccount",
                    "type": "account_name"
                },
                {
                    "name": "makersig",
                    "type": "bytes"
                },
                {
                    "name": "takersig",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "getbalances",
            "base": "",
            "fields": [{
                "name": "owner",
                "type": "account_name"
            }]
        },
        {
            "name": "resetex",
            "base": "",
            "fields": [{
                "name": "owner",
                "type": "account_name"
            }]
        },
        {
            "name": "invalorders",
            "base": "",
            "fields": [{
                    "name": "admin",
                    "type": "account_name"
                },
                {
                    "name": "user",
                    "type": "account_name"
                },
                {
                    "name": "nonce",
                    "type": "uint64"
                }
            ]
        },
        {
            "name": "setlockparam",
            "base": "",
            "fields": [{
                    "name": "admin",
                    "type": "account_name"
                },
                {
                    "name": "tradelockperiod",
                    "type": "int64"
                },
                {
                    "name": "fundsreleaseperiod",
                    "type": "int64"
                }
            ]
        },
        {
            "name": "setadmin",
            "base": "",
            "fields": [{
                    "name": "account",
                    "type": "account_name"
                },
                {
                    "name": "isadmin",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "lock",
            "base": "",
            "fields": [{
                "name": "user",
                "type": "account_name"
            }]
        },
        {
            "name": "unlock",
            "base": "",
            "fields": [{
                "name": "user",
                "type": "account_name"
            }]
        },
        {
            "name": "account",
            "base": "",
            "fields": [{
                    "name": "currency",
                    "type": "uint64"
                },
                {
                    "name": "balance",
                    "type": "uint64"
                }
            ]
        }
    ],
    "actions": [{
            "name": "withdraw",
            "type": "withdraw",
            "ricardian_contract": ""
        },
        {
            "name": "userwithdraw",
            "type": "userwithdraw",
            "ricardian_contract": ""
        },
        {
            "name": "registeruser",
            "type": "registeruser",
            "ricardian_contract": ""
        },
        {
            "name": "trade",
            "type": "trade",
            "ricardian_contract": ""
        },
        {
            "name": "getbalances",
            "type": "getbalances",
            "ricardian_contract": ""
        },
        {
            "name": "resetex",
            "type": "resetex",
            "ricardian_contract": ""
        },
        {
            "name": "ispkpaired",
            "type": "ispkpaired",
            "ricardian_contract": ""
        },
        {
            "name": "invalorders",
            "type": "invalorders",
            "ricardian_contract": ""
        },
        {
            "name": "setlockparam",
            "type": "setlockparam",
            "ricardian_contract": ""
        },
        {
            "name": "setadmin",
            "type": "setadmin",
            "ricardian_contract": ""
        },
        {
            "name": "lock",
            "type": "lock",
            "ricardian_contract": ""
        },
        {
            "name": "unlock",
            "type": "unlock",
            "ricardian_contract": ""
        }
    ],
    "tables": [],
    "ricardian_clauses": [],
    "abi_extensions": []
};

module.exports = exchangeABI;