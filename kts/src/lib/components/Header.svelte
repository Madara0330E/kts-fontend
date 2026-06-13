<script>
  import ktsImg from '$lib/assets/images/components/kts.png';
  import sleshImg from '$lib/assets/images/components/slesh.png';
  import spmhImg from '$lib/assets/images/components/spm.png';
  let { title = 'KTS Frontend' } = $props();
</script>

<header class="bg-[#0f1015] 5 ">
  <div class="mx-auto flex max-w-screen-xl items-center justify-between h-[72px]">
  <div class="justify-center flex w-[182px] gap-[4px] h-[42px] items-center ">
  <div class="div">
    <img src={ktsImg} alt="kts" class="w-[76px] h-[28px]" />
  </div>
  <div class="div ">
      <img src={sleshImg} alt="slesh" class="w-[12px]  h-[42px]" />
  </div>
  <div class="div">
      <img src={spmhImg} alt="spm" class="w-[86px] h-[36px]" />
  </div>
  </div>
  
  </div>
</header>
