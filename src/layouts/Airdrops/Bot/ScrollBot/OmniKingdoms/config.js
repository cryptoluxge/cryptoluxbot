import { Contract, ethers } from 'ethers'
import { shortAddress } from 'utils/WalletHelpers'
import { omniKingdomAddress, omniKingdomABI } from './contractData'
export const scrollProvider = new ethers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')

export const omniKingdomContract = async (runner) => {
  return new Contract(omniKingdomAddress, omniKingdomABI, runner)
}

function generateRandomName(length) {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

export const mintPlayer = async (wallet) => {
  const randomName = generateRandomName(Math.floor(Math.random() * 8) + 1)
  const gameContract = await omniKingdomContract(wallet)
  const txResponse = await gameContract.mint(randomName, 'https://infura-ipfs.io/ipfs/QmVQPguk3yttbq9inEyFNrADpZpHUTxAmgBv44i1zyLor7', true)
  const txReceipt = await txResponse.wait()
}

export const getPlayerId = async (wallet) => {
  try {
    const gameContract = await omniKingdomContract(scrollProvider)
    const playerId = await gameContract.getPlayers(wallet.address)
    return Number(playerId[0])
  } catch {
    return 0
  }
}

export const getPlayerData = async (wallet) => {
  const playerId = await getPlayerId(wallet)
  const gameContract = await omniKingdomContract(scrollProvider)
  const data = await gameContract.getPlayer(playerId)
  return {
    name: data[13],
    avatar: data[14],
    isMale: data[15],
    level: Number(data[0]),
    xp: Number(data[1]),
    status: Number(data[2]),
    strength: Number(data[3]),
    health: Number(data[4]),
    magic: Number(data[5]),
    mana: Number(data[6]),
    agility: Number(data[7]),
    luck: Number(data[8]),
    wisdom: Number(data[9]),
    haki: Number(data[10]),
    perception: Number(data[11]),
    defense: Number(data[12]),
  }
}

export const getPlayerCooldown = async (wallet) => {
  const gameContract = await omniKingdomContract(scrollProvider)
  const playerId = await getPlayerId(wallet)
  const cooldown = await gameContract.getCooldown(playerId)
}

export const endGoldQuest = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.endQuestGold(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაგერიცხათ 1 ოქრო',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - EARNED 1 GOLD`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'არ დაგერიცხათ 1 ოქრო',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - NOT EARNED 1 GOLD`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const startGoldQuest = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.startQuestGold(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო ოქროს ქვესტი',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დაიწყო ოქროს ქვესტი - დაელოდეთ 1 წუთი და 10 წამი`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო ოქროს ქვესტი',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დაიწყო ოქროს ქვესტი`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const endGemQuest = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.endQuestGem(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დააგროვეთ 1 GEM',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დამთავრდა Gem Quest`)
      setTimeout(async () => {
        await endGoldQuest(wallet)
      }, 78 * 1000)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დააგროვეთ 1 GEM',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დამთავრდა Gem Quest`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const startGemQuest = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.startQuestGem(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო GEM ქვესტი',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დაიწყო Gem ქვესტი - დაელოდეთ 1 წუთი და 30 წამი`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო ოქროს ქვესტი',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დაიწყო Gem ქვესტი`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const endCombatTraining = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.endTrainingCombat(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დამთავრდა Combat ვარჯიში',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დამთავრდა ვარჯიში`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Combat ვარჯიში',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დამთავრდა ვარჯიში`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const startCombatTraining = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.startTrainingCombat(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Combat ვარჯიში',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დაიწყო ვარჯიში - დაელოდეთ 2 წუთი`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Combat ვარჯიში',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დაიწყო ვარჯიში`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const endManaTraining = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.endTrainingMana(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Mana ვარჯიში',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დამთავრდა Mana-ს ვარჯიში`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Mana ვარჯიში',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დამთავრდა Mana-ს ვარჯიში`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const startManaTraining = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  try {
    const playerId = await getPlayerId(wallet)
    const gameContract = await omniKingdomContract(wallet)
    const txResponse = await gameContract.startTrainingMana(playerId)
    const txReceipt = await txResponse.wait()
    if (txReceipt.status === 1) {
      successTxs += 1
      data.push({
        status: true,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Mana ვარჯიში',
      })
      console.log(`[+][SCROLL] - [${shortAddress(wallet.address, 5)}] - დაიწყო Mana-ს ვარჯიში - დაელოდეთ 5 წუთი`)
    } else {
      failedTxs += 1
      data.push({
        status: false,
        playerId: playerId,
        hash: txReceipt.hash,
        text: 'დაიწყო Mana ვარჯიში',
      })
      console.log(`[-][SCROLL] - [${shortAddress(wallet.address, 5)}] - არ დაიწყო Mana-ს ვარჯიში`)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}

export const startQuestsTasks = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  const goldQuest = await startGoldQuest(wallet)
  if (goldQuest.data[0].status) {
    successTxs += 1
    await new Promise((resolve) => {
      setTimeout(async () => {
        await endGoldQuest(wallet)
        resolve()
      }, 73 * 1000)
    })
  } else {
    failedTxs += 1
  }
  data.push(goldQuest)

  const gemQuest = await startGemQuest(wallet)
  if (gemQuest.data[0].status) {
    successTxs += 1
    await new Promise((resolve) => {
      setTimeout(async () => {
        await endGemQuest(wallet)
        resolve()
      }, 78 * 1000)
    })
  } else {
    failedTxs += 1
  }
  data.push(gemQuest)
  return data
}

export const startTrainingTasks = async (wallet) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  const combatTrain = await startCombatTraining(wallet)
  if (combatTrain.data[0].status) {
    successTxs += 1
    await new Promise((resolve) => {
      setTimeout(async () => {
        await endCombatTraining(wallet)
        resolve()
      }, 150000)
    })
  } else {
    failedTxs += 1
  }
  data.push(combatTrain)
  const manaTrain = await startManaTraining(wallet)
  if (manaTrain.data[0].status) {
    successTxs += 1
    await new Promise((resolve) => {
      setTimeout(async () => {
        await endManaTraining(wallet)
        resolve()
      }, 320000)
    })
  } else {
    failedTxs += 1
  }
  data.push(combatTrain)
  return data
}

export const startBotAgain = async (wallet) => {
  await startOmniKingdomTasks(wallet)
}

export const startOmniKingdomTasks = async (wallet) => {
  const data = []
  const id = await getPlayerId(wallet)
  if (id !== 0) {
    console.log('მოწმდება სტატუსი...')
    const playerData = await getPlayerData(wallet)
    if (playerData.status === 0) {
      console.log('იწყება ქვესტის ტასკები...')
      const quests = await startQuestsTasks(wallet)
      console.log('იწყება ვარჯიშის ტასკები')
      const training = await startTrainingTasks(wallet)
      data.push({ quests, training })
    } else if (playerData.status === 1) {
      console.log('მიმდინარეობს ვარჯიშის დამთავრება...')
      const finishCombatTrain = await endCombatTraining(wallet)
      if (!finishCombatTrain.data[0].status) {
        await startOmniKingdomTasks(wallet)
      }
    } else if (playerData.status === 2) {
      console.log('მიმდინარეობს ოქროს ქვესტი დამთავრება...')
      const finishGoldQuest = await endGoldQuest(wallet)
      if (!finishGoldQuest.data[0].status) {
        await startOmniKingdomTasks(wallet)
      }
    } else if (playerData.status === 3) {
      console.log('მიმდინარეობს მანას ვარჯიშის დამთავრება...')
      const finishManaQuest = await endManaTraining(wallet)
      if (!finishManaQuest.data[0].status) {
        await startOmniKingdomTasks(wallet)
      }
    } else if (playerData.status === 5) {
      console.log('მიმდინარეობს Gem ქვესტის დამთავრება...')
      const finishGemQuest = await endGemQuest(wallet)
      if (!finishGemQuest.data[0].status) {
        await startOmniKingdomTasks(wallet)
      }
    }
  } else {
    await mintPlayer(wallet)
    await startOmniKingdomTasks(wallet)
  }
  console.log('დამთაsვრდა Scroll Kingdom-ის ყველა ტასკი და ვარჯიში')
}
