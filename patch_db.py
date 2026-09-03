import json
import os

filepath = r"c:\Users\PC\Desktop\DIAS\Vayzo_Project\db.json"
with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

data["paymentSettings"] = {
    "gateways": {
      "razorpay": True,
      "stripe": False,
      "paypal": False,
      "cod": True,
      "razorpayUpi": True
    },
    "paymentMethods": {
      "upi": True,
      "card": True,
      "netBanking": True,
      "wallet": True,
      "cod": True
    }
}

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
