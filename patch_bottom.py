import sys

file_path = 'src/pages/settings/GeneralSettings.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">')

if start_idx != -1:
    new_bottom = '''<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {/* Contact Address */}
              <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">Contact Address</h3>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="addressLine1" label="Address Line 1" placeholder="123, Anna Salai" />
                    <Input id="addressLine2" label="Address Line 2" placeholder="Teynampet" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="city" label="City" placeholder="Chennai" />
                    <Select id="state" label="State"><option>Tamil Nadu</option></Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="postalCode" label="Postal Code" placeholder="600018" />
                    <Select id="country" label="Country"><option>India</option></Select>
                  </div>
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
                  <Button type="button" size="sm" variant="outline" className="w-full flex items-center justify-center gap-2 border-border bg-surface text-foreground hover:bg-primary-light/50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                    Check for Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeneralSettings;
'''
    
    content = content[:start_idx] + new_bottom
    with open('src/pages/settings/GeneralSettings.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Bottom form updated successfully!')
