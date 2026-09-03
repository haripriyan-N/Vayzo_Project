with open('src/pages/settings/GeneralSettings.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('<div className="flex-1 space-y-6">')
end_idx = content.find('</section>')

if start_idx != -1:
    new_content = content[:content.find('return (')]
    new_content += 'return (\n    <>\n      '
    inner = content[start_idx:end_idx]
    new_content += inner.strip()
    new_content += '\n    </>\n  );\n}\n\nexport default GeneralSettings;\n'
    
    with open('src/pages/settings/GeneralSettings.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Patched GeneralSettings.jsx')
else:
    print('Failed to find start_idx')
