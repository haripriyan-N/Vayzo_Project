import sys

file_path = 'src/pages/settings/GeneralSettings.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Part 1: Change flex-1 to include grid for top section
content = content.replace(
    '<div className="flex-1 space-y-5">\n            <form onSubmit={handleSave} className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">',
    '<div className="flex-1 space-y-5">\n            <div className="grid gap-5 xl:grid-cols-[2.2fr_1fr]">\n              <form onSubmit={handleSave} className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">'
)

# Part 2: Replace everything from </form> down to the end of the flex-1 div
start_idx = content.find('            </form>\n\n            <div className="grid gap-5 xl:grid-cols-[1.7fr_0.9fr]">')

if start_idx != -1:
    end_idx = content.find('          </div>\n        </div>\n      </div>\n    </section>', start_idx)
    if end_idx != -1:
        new_bottom = '''            </form>

              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Site Status</h3>
                  <p className="mb-4 text-xs text-muted">Turn your platform on/off for users.</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Platform Status</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium ${formValues.platformStatus ? "text-success" : "text-muted"}`}>
                          {formValues.platformStatus ? "Active" : "Offline"}
                        </span>
                        <button
                          type="button"
                          aria-label="Toggle platform status"
                          onClick={() => handleChange("platformStatus", !formValues.platformStatus)}
                          className={`relative h-5 w-9 rounded-full transition-colors ${
                            formValues.platformStatus ? "bg-success" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                              formValues.platformStatus ? "left-4.5 translate-x-4" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
                        <p className="text-xs text-muted mt-1">Enable maintenance mode to restrict<br/>access to the platform.</p>
                      </div>
                      <button
                        type="button"
                        aria-label="Toggle maintenance mode"
                        onClick={() => handleChange("maintenanceMode", !formValues.maintenanceMode)}
                        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                          formValues.maintenanceMode ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            formValues.maintenanceMode ? "left-4.5 translate-x-4" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Quick Links</h3>
                  <div className="space-y-2 text-sm text-muted">
                    <a href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-primary hover:bg-primary-light">
                      <div className="bg-primary-light/30 p-1.5 rounded text-primary"><LayoutGrid size={16} /></div>
                      <div>
                        <span className="block font-medium">Clear Cache</span>
                        <span className="block text-xs text-muted">Clear system cache</span>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-primary hover:bg-primary-light">
                      <div className="bg-primary-light/30 p-1.5 rounded text-primary"><Database size={16} /></div>
                      <div>
                        <span className="block font-medium">System Backup</span>
                        <span className="block text-xs text-muted">Download system backup</span>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-primary hover:bg-primary-light">
                      <div className="bg-primary-light/30 p-1.5 rounded text-primary"><Database size={16} /></div>
                      <div>
                        <span className="block font-medium">Database Backup</span>
                        <span className="block text-xs text-muted">Download database backup</span>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-primary hover:bg-primary-light">
                      <div className="bg-primary-light/30 p-1.5 rounded text-primary"><FileText size={16} /></div>
                      <div>
                        <span className="block font-medium">System Logs</span>
                        <span className="block text-xs text-muted">View system logs</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {/* Contact Address */}
              <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">Contact Address</h3>
                <div className="flex-1 space-y-4">
                  <Input id="addressLine1" label="Address Line 1" placeholder="123, Anna Salai" />
                  <Input id="addressLine2" label="Address Line 2" placeholder="Teynampet" />
                  <Input id="city" label="City" placeholder="Chennai" />
                  <Select id="state" label="State"><option>Tamil Nadu</option></Select>
                  <Input id="postalCode" label="Postal Code" placeholder="600018" />
                  <Select id="country" label="Country"><option>India</option></Select>
                </div>
                <div className="mt-5 flex justify-center">
                  <Button type="button" size="sm" className="w-full max-w-[200px] bg-primary text-white">Save Changes</Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">Social Links</h3>
                <div className="flex-1 space-y-4">
                  <Input id="facebookUrl" label="Facebook" value={formValues.facebook} onChange={(e) => handleChange("facebook", e.target.value)} />
                  <Input id="instagramUrl" label="Instagram" value={formValues.instagram} onChange={(e) => handleChange("instagram", e.target.value)} />
                  <Input id="twitterUrl" label="Twitter" value={formValues.twitter} onChange={(e) => handleChange("twitter", e.target.value)} />
                  <Input id="linkedinUrl" label="LinkedIn" value="https://linkedin.com/company/vayzo" />
                </div>
                <div className="mt-5 flex justify-center">
                  <Button type="button" size="sm" className="w-full max-w-[200px] bg-primary text-white">Save Changes</Button>
                </div>
              </div>

              {/* Upload Banners */}
              <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">Upload Banners</h3>
                <div className="flex-1 space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-foreground">Home Banner (1920x600)</label>
                    <div className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary-light/20 text-center hover:bg-primary-light/40">
                      <span className="text-primary text-xl">↑</span>
                      <span className="mt-1 text-xs font-medium text-primary">Click to upload</span>
                      <span className="text-[10px] text-muted">PNG, JPG (Max 2MB)</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-foreground">Offer Banner (1920x600)</label>
                    <div className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary-light/20 text-center hover:bg-primary-light/40">
                      <span className="text-primary text-xl">↑</span>
                      <span className="mt-1 text-xs font-medium text-primary">Click to upload</span>
                      <span className="text-[10px] text-muted">PNG, JPG (Max 2MB)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <Button type="button" size="sm" className="w-full max-w-[200px] bg-primary text-white">Save Changes</Button>
                </div>
              </div>

              {/* System Info */}
              <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">System Info</h3>
                <div className="flex-1 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Current Version</span>
                    <span className="text-muted">v 1.0.0</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">PHP Version</span>
                    <span className="text-muted">8.2.12</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Laravel Version</span>
                    <span className="text-muted">11.x</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Server Time</span>
                    <span className="text-muted">12 May 2024, 10:30 AM</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Storage Used</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted">40% (20 GB / 50 GB)</span>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                        <div className="h-full w-[40%] bg-primary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-medium text-foreground">Last Backup</span>
                    <span className="text-muted">11 May 2024, 11:30 PM</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Button type="button" size="sm" variant="secondary" className="w-full bg-surface border border-border text-foreground hover:bg-primary-light/50">
                    <span className="flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                      Check for Updates
                    </span>
                  </Button>
                </div>
              </div>
            </div>
'''
        content = content[:start_idx] + new_bottom + '\n          </div>\n        </div>\n      </div>\n    </section>'
        
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Success!')
