<script>
  import ktsImg from '$lib/assets/images/components/kts.png';
  import sleshImg from '$lib/assets/images/components/slesh.png';
  import spmhImg from '$lib/assets/images/components/spm.png';
  import madara0330hImg from '$lib/assets/images/components/Madara0330H.png';
  let { title = 'KTS Frontend' } = $props();
  const navItems = [
    { name: 'Профиль', href: '/profile' },
    { name: 'Банкинг', href: '/banking' },
    { name: 'Склады', href: '/warehouses' }
  ];
</script>

<header class="bg-[#0f1015] pl-[188px] pr-[188px] ">
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
  <div class="nav">
    <nav class="flex items-center justify-center w-full h-[72px] gap-[64px] ">
      {#each navItems as item}
        <a href={item.href} class="flex items-center justify-center">
          <span class="text-xl text-[#F8F8F8] font-medium font-tiktok">{item.name}</span>
        </a>
      {/each}
    </nav>
  </div>
<div class="profile gap-3 flex items-center justify-center">

<div class="">
    <a href="/profile" class="flex items-center justify-center">
          <span class="text-xl text-[#F8F8F8] font-medium font-tiktok">Madara0330H</span>
        </a>
  </div>
  <div class="">
  <a href="/profile" class="flex items-center justify-center">
          <span class="text-xl text-[#F8F8F8] font-medium font-tiktok">   <img src={madara0330hImg} alt="madara0330h" class="w-[44px] h-[44px]" /></span>
        </a>
    
  </div>
</div>
  </div>
</header>
