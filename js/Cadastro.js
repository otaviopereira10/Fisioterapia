function toggleCRMField() {
    const roleSelect = document.getElementById('role');
    const crmField = document.getElementById('crm-field');

    if (roleSelect.value === 'especialista') {
        crmField.classList.remove('hidden');
    } else {
        crmField.classList.add('hidden');
    }
}