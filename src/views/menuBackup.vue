<style scoped>
</style>

<template>
    <MenuPage :title="$t('backup.title')">
        <div style="text-align: center">
            <div style="width: 200px;" class="btn bg-green" @click="backup">{{ $t('backup.button') }}</div>
        </div>
    </MenuPage>
</template>

<script>
import account from "@/models/account";
import FileSaver from "file-saver";
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
        backup() {
            account.backup().then(txt => {
                var blob = new Blob([txt], {
                    type: "text/plain;charset=utf-8"
                });
                FileSaver.saveAs(blob, "bytom_chrome_wallet_backup.txt");
            });
        }
    }
};
</script>