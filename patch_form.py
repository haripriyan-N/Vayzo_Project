import sys

file_path = 'src/pages/settings/GeneralSettings.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_form = content.find('<form onSubmit={handleSave}')
end_form = content.find('</form>') + len('</form>')

if start_form != -1 and end_form != -1:
    new_form = '''<form onSubmit={handleSave} className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-1 border-b border-border pb-4">
                  <h2 className="text-lg font-semibold text-foreground">General Settings</h2>
                  <p className="text-xs text-muted">Manage your platform general settings and preferences.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <Input
                      id="platformName"
                      label="Platform Name *"
                      value={formValues.platformName}
                      onChange={(event) => handleChange("platformName", event.target.value)}
                    />

                    <Input
                      id="platformTagline"
                      label="Platform Tagline"
                      value={formValues.platformTagline}
                      onChange={(event) => handleChange("platformTagline", event.target.value)}
                    />

                    <Input
                      id="supportEmail"
                      label="Support Email *"
                      type="email"
                      value={formValues.supportEmail}
                      onChange={(event) => handleChange("supportEmail", event.target.value)}
                    />

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Support Phone *</label>
                      <div className="flex rounded-lg border border-border focus-within:border-primary">
                        <div className="flex items-center gap-2 border-r border-border bg-surface px-3 py-2 text-sm">
                          <span className="text-lg">🇮🇳</span>
                          <span>+91</span>
                          <svg className="h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                        <input
                          type="text"
                          value={formValues.supportPhone}
                          onChange={(e) => handleChange("supportPhone", e.target.value)}
                          className="w-full rounded-r-lg bg-surface px-3 py-2 text-sm outline-none"
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>

                    <Select
                      id="timezone"
                      label="Default Timezone *"
                      value={formValues.timezone}
                      onChange={(event) => handleChange("timezone", event.target.value)}
                    >
                      <option value="Asia/Kolkata">(GMT+05:30) Asia/Kolkata</option>
                    </Select>

                    <Select
                      id="dateFormat"
                      label="Date Format"
                      value={formValues.dateFormat}
                      onChange={(event) => handleChange("dateFormat", event.target.value)}
                    >
                      <option value="DD/MM/YYYY">DD MMM YYYY (12 May 2024)</option>
                    </Select>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Time Format</label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                          <input type="radio" name="timeFormat" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
                          <span className="text-primary font-medium">12 Hours (02:30 PM)</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                          <input type="radio" name="timeFormat" className="h-4 w-4 border-muted focus:ring-primary" />
                          <span>24 Hours (14:30)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Platform Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-border bg-surface shadow-sm">
                          <span className="text-xl font-bold text-foreground">VAYZO</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button type="button" variant="outline" size="sm" className="w-fit rounded-full border-primary/20 px-4 text-primary hover:bg-primary-light">
                            Change Logo
                          </Button>
                          <span className="text-[10px] text-muted">PNG, JPG or SVG (Max 2MB)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Favicon</label>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20">
                          <span className="text-xl font-bold text-white">V</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button type="button" variant="outline" size="sm" className="w-fit rounded-full border-primary/20 px-4 text-primary hover:bg-primary-light">
                            Change Favicon
                          </Button>
                          <span className="text-[10px] text-muted">ICO, PNG (Max 1MB)</span>
                        </div>
                      </div>
                    </div>

                    <Select
                      id="defaultCurrency"
                      label="Default Currency *"
                      value={formValues.defaultCurrency}
                      onChange={(event) => handleChange("defaultCurrency", event.target.value)}
                    >
                      <option value="INR">INR (₹) - Indian Rupee</option>
                    </Select>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Currency Position</label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                          <input type="radio" name="currencyPosition" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
                          <span className="text-primary font-medium">Before Amount (₹100)</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                          <input type="radio" name="currencyPosition" className="h-4 w-4 border-muted focus:ring-primary" />
                          <span>After Amount (100₹)</span>
                        </label>
                      </div>
                    </div>

                    <Select
                      id="numberFormat"
                      label="Number Format"
                      value={formValues.numberFormat}
                      onChange={(event) => handleChange("numberFormat", event.target.value)}
                    >
                      <option value="1,234.56">1,234.56.78</option>
                    </Select>

                    <Select
                      id="language"
                      label="Language"
                      value={formValues.language}
                      onChange={(event) => handleChange("language", event.target.value)}
                    >
                      <option value="English">English</option>
                    </Select>
                    
                    <div className="pt-2 flex justify-end">
                      <Button type="submit" size="md" className="bg-primary text-white">Save Changes</Button>
                    </div>
                  </div>
                </div>
              </form>'''
    
    content = content[:start_form] + new_form + content[end_form:]
    with open('src/pages/settings/GeneralSettings.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Form updated successfully!')
