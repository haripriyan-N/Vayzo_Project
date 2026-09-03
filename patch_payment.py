import re
import os

filepath = r"c:\Users\PC\Desktop\DIAS\Vayzo_Project\src\pages\settings\PaymentSettings.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
content = content.replace(
    'import { useState } from "react";',
    'import { useState, useEffect } from "react";\nimport Modal from "../../components/ui/Modal";\nimport Button from "../../components/ui/button";'
)

# Update state and add useEffect / handleSave
state_str = """  const [paymentMethods, setPaymentMethods] = useState({
    upi: true,
    card: true,
    netBanking: true,
    wallet: true,
    cod: true,
  });"""

new_state_str = state_str + """

  const [editingGateway, setEditingGateway] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/paymentSettings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.gateways) {
          setGateways(data.gateways);
          setPaymentMethods(data.paymentMethods);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading payment settings:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3001/paymentSettings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gateways, paymentMethods }),
      });
      if (response.ok) {
        alert("Payment settings saved successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      alert("Error saving settings.");
    }
  };"""

content = content.replace(state_str, new_state_str)

# Update Save button
save_btn = """<button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90">
                      <Save size={16} />
                      Save Changes
                    </button>"""
new_save_btn = """<Button onClick={handleSave} className="flex items-center gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>"""
content = content.replace(save_btn, new_save_btn)

# Add edit functions and modals to Gateway
# Wait, Gateway receives onToggle, let's pass onEdit
gateway_comp = """function Gateway({
  logo,
  description,
  active,
  onToggle,
  fields,
}) {"""
new_gateway_comp = """function Gateway({
  logo,
  description,
  active,
  onToggle,
  onEdit,
  fields,
}) {"""
content = content.replace(gateway_comp, new_gateway_comp)

edit_btn = """<button className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-light">
            Edit Settings
          </button>"""
new_edit_btn = """<Button variant="secondary" onClick={onEdit}>
            Edit Settings
          </Button>"""
content = content.replace(edit_btn, new_edit_btn)

# Same for razorpay upi edit button
upi_edit = """<button className="hidden rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-light sm:block">
                        Edit Settings
                      </button>"""
new_upi_edit = """<div className="hidden sm:block"><Button variant="secondary" onClick={() => setEditingGateway("razorpayUpi")}>
                        Edit Settings
                      </Button></div>"""
content = content.replace(upi_edit, new_upi_edit)


# Add onEdit to Gateways
content = content.replace('onToggle={() => toggleGateway("razorpay")}', 'onToggle={() => toggleGateway("razorpay")}\n                      onEdit={() => setEditingGateway("razorpay")}')
content = content.replace('onToggle={() => toggleGateway("stripe")}', 'onToggle={() => toggleGateway("stripe")}\n                      onEdit={() => setEditingGateway("stripe")}')
content = content.replace('onToggle={() => toggleGateway("paypal")}', 'onToggle={() => toggleGateway("paypal")}\n                      onEdit={() => setEditingGateway("paypal")}')


# Insert Modal before the final return of PaymentSettings
# Wait, the closing tag of section is:
#     </section>
#   );
# }

modal_code = """
        <Modal
          isOpen={!!editingGateway}
          onClose={() => setEditingGateway(null)}
          title={`Edit ${editingGateway ? editingGateway.toUpperCase() : ''} Settings`}
        >
          <div className="space-y-4">
            <p className="text-sm text-muted">Update your API keys and credentials here. These values will be saved locally.</p>
            {editingGateway === 'razorpay' && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Key ID</label>
                  <input type="text" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="rzp_test_..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Key Secret</label>
                  <input type="password" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="••••••••••••••••" />
                </div>
              </>
            )}
            {editingGateway === 'stripe' && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Publishable Key</label>
                  <input type="text" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="pk_test_..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Secret Key</label>
                  <input type="password" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="sk_test_..." />
                </div>
              </>
            )}
            {editingGateway === 'paypal' && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Client ID</label>
                  <input type="text" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Secret</label>
                  <input type="password" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="••••••••••••••••" />
                </div>
              </>
            )}
             {editingGateway === 'razorpayUpi' && (
              <>
                <p className="text-sm text-foreground">UPI settings are inherited from Razorpay main settings.</p>
              </>
            )}
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditingGateway(null)}>Cancel</Button>
              <Button onClick={() => setEditingGateway(null)}>Save Credentials</Button>
            </div>
          </div>
        </Modal>
"""

content = content.replace("    </section>\n  );\n}", modal_code + "    </section>\n  );\n}")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
