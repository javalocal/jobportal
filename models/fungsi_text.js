
    module.exports = function conf() {
        this.pend_text;
        this.peng_text;
        this.name=null;
        this.id=null;
        this.savedata=function(name, id){
            this.name =name;
            this.id =id;
        }
            this.endu=function(pndk_terakhir) {
                if(pndk_terakhir==1){
                    this.pend_text ="SMA/Sederajat";
                }else if(pndk_terakhir==2){
                    this.pend_text="D3";
                }else if(pndk_terakhir==3){
                    this.pend_text="S1";
                }else if(pndk_terakhir==4){
                    this.pend_text="S2";
                }else{
                    this.pend_text="S3";
                }
                return this.pend_text;
            }

            this.peng=function(pengalaman) {
                if(pengalaman==-1){
                    this.peng_text="Belum ada pengalaman";
                }else if (pengalaman==0){
                    this.peng_text="Kurang dari 1 Tahun";
                }else if (pengalaman==1){
                    this.peng_text="1 Tahun";
                }else if (pengalaman==2){
                this.peng_text="lebih dari 2 Tahun";
            }else{
                this.peng_text="Lebih dari 5 tahun"
            }
            return this.peng_text;
                
            }
        }